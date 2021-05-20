#we define the region and have the access key and secret key here
provider "aws" {
  region     = "us-west-1"
  access_key = "AKIA57ACGY7BO7J4YCJI"
  secret_key = "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"
}

#Creates a private key
resource "tls_private_key" "Stonkers-Key" {
  algorithm = "RSA"
}

#Creates a key pair
resource "aws_key_pair" "Instance-Key" {
  key_name   = "Web-key"
  public_key = tls_private_key.Stonkers-Key.public_key_openssh
}

#The key is saved onto the computer
resource "local_file" "Stonkers-Key" {
  content     = tls_private_key.Stonkers-Key.private_key_pem 
  filename = "Web-Key.pem"
}

#Creates the VPC
resource "aws_vpc" "stonkers_vpc" {
  cidr_block = "10.0.0.0/16"
  tags = {
    Name = "stonkers_vpc"
  }
}

#Creates the subnet
resource "aws_subnet" "stonkers-subnet" {
  tags = {
    Name = "stonkers_Subnet"
  }
  vpc_id = aws_vpc.stonkers_vpc.id
  cidr_block = "10.0.1.0/24"
  map_public_ip_on_launch = true
  depends_on= [aws_vpc.stonkers_vpc]
    
}

#Creates the routing table
resource "aws_route_table" "stonkers-table" {
  tags = {
    Name = "MY_Route_table"
      
  }
    vpc_id = aws_vpc.stonkers_vpc.id
}

#Associate the routing table with the subnet
resource "aws_route_table_association" "App_Route_Association" {
  subnet_id      = aws_subnet.stonkers-subnet.id 
  route_table_id = aws_route_table.stonkers-table.id
}


#Creates the internet gateway for the webserver
resource "aws_internet_gateway" "my_gateway" {
  tags = {
    Name = "my_internet_gateway"  
  }
    vpc_id = aws_vpc.stonkers_vpc.id
    depends_on = [aws_vpc.stonkers_vpc]
}

#Add default route in routing table to point to Internet Gateway
resource "aws_route" "default_route" {
  route_table_id = aws_route_table.stonkers-table.id
  destination_cidr_block = "0.0.0.0/0"
  gateway_id = aws_internet_gateway.my_gateway.id
}

#Define our security groups
resource "aws_security_group" "SG" {
  name = "SG"
  description = "Web Traffic"
  vpc_id = aws_vpc.stonkers_vpc.id
  ingress  {
    protocol = "tcp"
    from_port = 80
    to_port  = 80
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress  {
    protocol = "tcp"
    from_port = 443
    to_port  = 443
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress  {
    protocol = "tcp"
    from_port = 22
    to_port  = 22
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress  {
    protocol = "-1"
    from_port = 0
    to_port  = 0
    cidr_blocks = ["0.0.0.0/0"]
  }
}

#This will spin our webserver instance and add some dependencies
resource "aws_instance" "Web" {
  ami = "ami-0577b787189839998"
  instance_type = "t2.micro"
  tags = {
    Name = "StonkersWebServer"
  }
  count =1
  subnet_id = aws_subnet.stonkers-subnet.id 
  key_name = "Web-key"
  security_groups = [aws_security_group.SG.id]

  provisioner "remote-exec" {
    connection {
      type = "ssh"
      user = "ec2-user"
      private_key = tls_private_key.Stonkers-Key.private_key_pem
      host = aws_instance.Web[0].public_ip
    }    
    inline = [
      "sudo yum install httpd php git -y",
      "sudo systemctl restart httpd",
      "sudo systemctl enable httpd",
      "sudo rm -rf /var/www/html/*",
      "sudo git clone https://github.com/lancearjona/stockers-cit-481.git /var/www/html"
    ]
  }
}

#Creating the EBS volume
resource "aws_ebs_volume" "stonkers_ebs" {
  availability_zone = aws_instance.Web[0].availability_zone
  size              = 1
  tags = {
    Name = "ebs_vol"
  }
}

#Attaching the EBS volume to our webserver
resource "aws_volume_attachment" "attach_ebs" {
  depends_on = [aws_ebs_volume.stonkers_ebs]
  device_name = "/dev/xvdh"
  volume_id   = aws_ebs_volume.stonkers_ebs.id
  instance_id = aws_instance.Web[0].id
  force_detach = true

}

#Define S3 ID
locals {
 s3_origin_id = "s3-origin"
}

#Create a S3 bucket
resource "aws_s3_bucket" "darvyacbucket" {
  bucket = "darvyacbucket"
  acl    = "public-read-write"
  #region = "us-west-1"
  
  versioning {
    enabled = true
  }

  tags = {
    Name = "darvyacbucket"
  }
}

#Allow public access to the bucket
resource "aws_s3_bucket_public_access_block" "public_storage" {
  depends_on = [aws_s3_bucket.darvyacbucket]
  bucket = "darvyacbucket"
  block_public_acls = false
  block_public_policy = false
}

#Honestly I still don't get this one very much
#resource "aws_s3_bucket_object" "Object1" {
#  depends_on = [aws_s3_bucket.darvyacbucket]
#  bucket = "darvyacbucket"
#  acl    = "public-read-write"
#  key = "weedle.png"
#  source = "C:/Users/Darvy C/Desktop/Terraform/2nd try/weedle.png"
#}

#Create the Cloudfront 
resource "aws_cloudfront_distribution" "tera-cloufront" {
  #depends_on = [ aws_s3_bucket_object.Object1]
  origin {
      domain_name = aws_s3_bucket.darvyacbucket.bucket_regional_domain_name
      origin_id = local.s3_origin_id
  }   
  enabled = true
    default_cache_behavior {
      allowed_methods = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
      cached_methods = ["GET", "HEAD"]
      target_origin_id = local.s3_origin_id

      forwarded_values {
          query_string = false
      
          cookies {
              forward = "none"
          }
      }
      viewer_protocol_policy = "allow-all"
      min_ttl = 0
      default_ttl = 3600
      max_ttl = 86400
      compress = true
      #viewer_protocol_policy = "redirect-to-https"
  }

  restrictions {
      geo_restriction {
          restriction_type = "none"
      }
  }

    viewer_certificate {
      cloudfront_default_certificate = true

  } 

#  connection {
#  type     = "ssh"
#  user     = "ec2-user"
#  private_key = tls_private_key.Web-Key.private_key_pem
#  host     = aws_instance.Web[0].public_ip
#    }
#  provisioner "remote-exec" {
#        inline = [
#            "sudo su << EOF",
#                    "echo \"<img src='http://${aws_cloudfront_distribution.tera-cloufront1.domain_name}/${aws_s3_bucket_object.Object1.key}' width='300' height='380'>\" >>/var/www/html/index.html",
#                    "echo \"</body>\" >>/var/www/html/index.html",
#                    "echo \"</html>\" >>/var/www/html/index.html",
#                    "EOF",    
#        ]
#  }
}


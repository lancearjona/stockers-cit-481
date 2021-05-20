resource "aws_eip_association" "eip_assoc" {
  
  instance_id = aws_instance.Web[0].id
  allocation_id = aws_eip.lb.id
  #network_interface_id = aws_network_interface.multi-ip.id
}

resource "aws_eip" "lb" {
  vpc = true
  instance = aws_instance.Web[0].id

}



resource "aws_route53_zone" "easy_aws" {
    name = "darvyac.com"

    tags = {
         Environment = "dev"
     }
      
}

resource "aws_route53_record" "www" {
    zone_id = aws_route53_zone.easy_aws.zone_id
    name = "www.darvyac.com"
    type = "A"
    ttl = "300"
    records = [aws_eip.lb.public_ip]
}
/*
resource "aws_acm_certificate" "cert" {
  domain_name = "darvyac.com"
  validation_method = "DNS"

  tags = {
    Environment = "test"
  }

  lifecycle {
    create_before_destroy = true
  }
}*/
########################################################################

/*

TEST

resource "aws_lb" "test" {
  name = "test-lb"
  internal = false
  load_balancer_type = "network"

  subnet_mapping {
    subnet_id     = aws_subnet.stonkers-subnet.id
    allocation_id = aws_eip.lb.id
  }

}


resource "aws_lb_listener" "test" {
  load_balancer_arn = aws_lb.test.arn
  port = "443"
  protocol = "HTTPS"
  certificate_arn  = aws_acm_certificate.test.arn


  default_action {
    type = "forward"
    target_group_arn = aws_lb_target_group.dev.arn
  }
}


resource "aws_lb_listener_certificate" "test" {
  listener_arn = aws_lb_listener.test.arn
  certificate_arn = aws_acm_certificate.test.arn
}


resource "aws_lb_listener_rule" "test" {
  listener_arn = aws_lb_listener.test.arn
  priority = 100


  action {
    type = "forward"
    target_group_arn = aws_lb_target_group.dev.arn
  }


  condition {
    host_header {
      values = ["darvyac.com"]
    }
  }
}

resource "random_integer" "default" {
  min = 1
  max = 9999
}
resource "aws_lb_target_group" "dev" {
  name = "dev-${random_integer.default.result}"
  port = 8080
  protocol = "HTTP"
  target_type = "instance"
  vpc_id = aws_vpc.stonkers_vpc.id
  lifecycle {
    create_before_destroy = true
  }
}


resource "aws_lb_target_group_attachment" "dev" {
  target_group_arn = aws_lb_target_group.dev.arn
  target_id = aws_instance.Web[0].id
  port = 8080
}

resource "aws_acm_certificate" "test" {
  domain_name = "darvyac.com"
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}*/
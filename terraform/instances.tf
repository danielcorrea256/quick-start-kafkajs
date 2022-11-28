variable "shape" {
    # It's free
    default = "VM.Standard.E2.1.Micro" 
}

variable "ubuntu_image_id" {
    default = "ocid1.image.oc1.iad.aaaaaaaaadek6nehyiziiixufneopli76szucyjo7rig5k6znv2pbc4kgloq"
}

resource "oci_core_instance" "k8s_instance" {
    # Required
    availability_domain = var.availability_domain
    compartment_id = var.compartment_id
    shape = var.shape

    display_name = "k8s_instance"
    
    create_vnic_details {
        subnet_id = oci_core_subnet.public_subnet.id
        assign_public_ip = true
    }

    source_details {
        source_id = var.ubuntu_image_id
        source_type = "image"
    }

    metadata = {
        ssh_authorized_keys = file(var.ssh_public_key)
    }

}

output "instance_ip" {
    value = oci_core_instance.k8s_instance.public_ip
    description = "public ip"
}
resource "oci_core_vcn" "kafka_vcn" {
    # Required
    compartment_id = var.compartment_id
    
    cidr_blocks = ["10.0.0.0/16"]
    display_name = "kafka_vcn"
}

resource "oci_core_internet_gateway" "internet_gateway" {
    # Required
    compartment_id = var.compartment_id
    vcn_id = oci_core_vcn.kafka_vcn.id

    display_name = "kafka_vcn_internet_gateway"
}

resource "oci_core_subnet" "public_subnet" {
    # Required
    cidr_block = "10.0.0.0/24"
    compartment_id = var.compartment_id
    vcn_id = oci_core_vcn.kafka_vcn.id

    display_name = "public_subnet_kafka"
    security_list_ids = [oci_core_vcn.kafka_vcn.default_security_list_id]
    route_table_id = oci_core_vcn.kafka_vcn.default_route_table_id
    dhcp_options_id = oci_core_vcn.kafka_vcn.default_dhcp_options_id
}

resource "oci_core_default_route_table" "default_route_table" {
    manage_default_resource_id = oci_core_vcn.kafka_vcn.default_route_table_id
    display_name = "default_route_table"

    route_rules {
        network_entity_id = oci_core_internet_gateway.internet_gateway.id
        destination = "0.0.0.0/0"
        destination_type = "CIDR_BLOCK"
    }
}


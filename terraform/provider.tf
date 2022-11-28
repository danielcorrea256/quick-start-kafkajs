provider "oci" {
    tenancy_ocid = var.tenancy_ocid
    user_ocid = var.user_ocid
    region = var.region

    # AUTH
    private_key_path = var.private_key_path
    fingerprint = var.fingerprint
}
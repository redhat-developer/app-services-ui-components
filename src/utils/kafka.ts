enum InstanceStatus {
    READY = 'ready',
    ACCEPTED = 'accepted',
    PREPARING = 'preparing',
    PROVISIONING = 'provisioning',
    FAILED = 'failed',
    DEPROVISION = 'deprovision',
    DELETED = 'deleting',
}

enum InstanceType {
    eval = 'eval',
    standard = 'standard',
}

export {
    InstanceStatus,
    InstanceType
};
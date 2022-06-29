import {Stack, StackProps} from 'aws-cdk-lib';
import {Construct} from 'constructs';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ecsp from 'aws-cdk-lib/aws-ecs-patterns';
import * as iam from 'aws-cdk-lib/aws-iam'
import {ManagedPolicy} from 'aws-cdk-lib/aws-iam';


export class EcsStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const taskRole = new iam.Role(this, 'AwsHustleWorkerRole', {
            assumedBy: new iam.ServicePrincipal('ecs-tasks.amazonaws.com'),
            managedPolicies: [
                ManagedPolicy.fromAwsManagedPolicyName('service-role/AmazonEC2ContainerServiceforEC2Role'),
                ManagedPolicy.fromAwsManagedPolicyName('AmazonEC2ContainerRegistryFullAccess')],
        });

        new ecsp.ApplicationLoadBalancedFargateService(this, 'AwsHustle', {
            taskImageOptions: {
                image: ecs.ContainerImage.fromRegistry(process.env.MAIN_IMAGE_LINK ?? ""),
                executionRole: taskRole
            },
            publicLoadBalancer: true,
        });
    }
}

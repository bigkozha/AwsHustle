import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ecsp from 'aws-cdk-lib/aws-ecs-patterns';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class EcsStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'EcsQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
    new ecsp.ApplicationLoadBalancedFargateService(this, 'AwsHustle', {
      taskImageOptions: {
        image: ecs.ContainerImage.fromRegistry(process.env.MAIN_IMAGE_LINK ?? ""),

      },

      publicLoadBalancer: true,

    });
  }
}

import * as cdk from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

import {CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';

export class DemoawspipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    // AWS CI-CD Pipeline

const democicdpipeline = new CodePipeline(this, 'demopipeline', {
    synth: new ShellStep('Synth', {
    input: CodePipelineSource.gitHub('nittanynerd/democicd1019', 'main'),
    commands: ['npm ci', 'npm run build', 'npx cdk synth'],
  }),
});
  }
}

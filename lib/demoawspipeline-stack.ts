import * as cdk from 'aws-cdk-lib/core';
import { Construct } from 'constructs';

// import * as sqs from 'aws-cdk-lib/aws-sqs';

import {CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import {PipelineAppStage} from './demoawspipeline-app-stack'; 
import {ManualApprovalStep} from 'aws-cdk-lib/pipelines';



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
 
  const testingStage = democicdpipeline.addStage(new PipelineAppStage(this, 'test', {
    env: { account: '544636391340', region: 'us-east-1' },
  }));

  testingStage.addPost(new ManualApprovalStep('approval'));

  const prodStage = democicdpipeline.addStage(new PipelineAppStage(this, 'prod', {
    env: { account: '544636391340', region: 'us-east-1' },
  }));
}
}

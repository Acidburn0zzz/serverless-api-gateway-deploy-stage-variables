import APIGatewayManager from './aws-manager';

const manager = new APIGatewayManager();

class StageVariables {
  constructor(serverless, options) {
    this.options = options;
    this.serverless = serverless;

    this.commands = {
      ['stage-variables']: {
        usage: 'Deploy StageVariables to AWS API Gateway',
        lifecycleEvents: [
          'set'
        ],
      },
    };
    this.hooks = {
      'stage-variables:set': this.setStageVariables.bind(this)
    }
  }

  async setStageVariables() {
    const stage = this.options.stage || this.serverless.variables.service.defaults.stage;

    if (!this.serverless.service.custom.apiGateway || !this.serverless.service.custom.apiGateway.apiId) {
      throw new Error('Please provide an api_id (serverless.yml)');
    } else if (!this.serverless.service.custom.apiGateway.stageVariables) {
      throw new Error('Please set the stage variables env variable');
    }

    const { apiId } = this.serverless.service.custom.apiGateway;
    const stageVariables = JSON.parse(this.serverless.service.custom.apiGateway.stageVariables);

    try {
      await manager.replaceStageVariables(apiId, stage, stageVariables);
      console.log('Successfuly deployed stage variables.');
      return true;
    } catch (err) {
      console.log(`Error deploying stage variables :\n${err}`);
      return false;
    }
  }
}

module.exports = StageVariables;

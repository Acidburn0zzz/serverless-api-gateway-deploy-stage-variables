import AWS from 'aws-sdk';

AWS.config.update({
  region: 'eu-central-1',
});

class APIGatewayManager {
  constructor() {
    this.APIGateway = new AWS.APIGateway();
  }

  async getStage(restApiId, stageName) {
    return new Promise((resolve, reject) =>
      this.APIGateway.getStage({
        restApiId,
        stageName,
      }, (err, data) => (err ? reject(err) : resolve(data)))
    );
  }

  async updateStage(restApiId, stageName, params) {
    return await new Promise((resolve, reject) =>
      this.APIGateway.updateStage({
        restApiId,
        stageName,
        patchOperations: params,
      }, (err, data) => (err ? reject(err) : resolve(data)))
    );
  }

  async replaceStageVariables(restApiId, stageName, obj) {
    const stage = await this.getStage(restApiId, stageName);
    if (stage.variables) {
      const old = Object.keys(stage.variables).map(key =>
        ({
          op: 'remove',
          path: `/variables/${key}`,
          value: stage.variables[key],
        })
      ).filter(elem => elem.path !== '/variables/stage_alias');
      if (old.length) {
        await this.updateStage(restApiId, stageName, old);
      }
    }
    const params = Object.keys(obj).map(key =>
      ({
        op: 'replace',
        path: `/variables/${key}`,
        value: obj[key],
      })
    );
    return this.updateStage(restApiId, stageName, params);
  }
}

export default APIGatewayManager;

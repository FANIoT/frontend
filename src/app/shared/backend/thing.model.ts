export enum ConnectivityType {
  TTN = 'ttn',
  LoraServer = 'loraserver',
}

export class Asset {
  constructor(
    public name: string, // e.g. 100
    public title: string, // e.g. temperature
    public kind: string, // e.g. number
    public type: string, // sensor
  ) {
  }
}

export class TTNConnectivity {
  constructor(
    public applicationID: string,
    public deviceEUI: string,
  ) {
  }
}

export class Thing {
  public name: string;
  public id: string;
  public model: string;
  public latitude: number;
  public longitude: number;
  public project: string;

  public assets: Array<Asset> = [];
  public tokens: Array<string> = [];
  public connectivities: Array<any> = [];

  constructor(input: any) {
    this.name = input.name;
    this.id = input.id;
    this.model = input.model;
    this.latitude = input.location.coordinates[1];
    this.longitude = input.location.coordinates[0];
    this.project = input.project;

    Object.keys(input.assets).forEach((name) => {
      const info = input.assets[name];
      this.assets.push(new Asset(name, info.title, info.kind, info.type));
    });

    Object.keys(input.connectivities).forEach((name) => {
      const info = input.connectivities[name];
      switch (name) {
        case 'ttn':
          this.connectivities.push(new TTNConnectivity(info.application_id, info.device_eui));
      }
    });

    for (const token of input.tokens) {
      this.tokens.push(token);
    }
  }

}

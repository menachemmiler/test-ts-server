import statusBeeper from "../utils/statusBeeper";

class Beeper {
  public id: number;
  public status: string;
  public create_at: Date;
  public detonated_at: Date | string = "";
  public latitude: number = 0;
  public longitude: number = 0;
  constructor(public name: string) {
    this.id =
      Math.random() * 100 + new Date().getDay() + new Date().getSeconds();
    this.status = statusBeeper.manufactured;
    this.create_at = new Date();
  }
}

export default Beeper;

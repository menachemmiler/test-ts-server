import { getFileData, saveFileData } from "../DAL/fileDataLayer";
import NewBeeperDTO from "../DTO/NewBeeperDTO";
import Beeper from "../models/beeperModel";

export default class BeeperService {
  public static async getAllBeepers(): Promise<Beeper[]> {
    let beepers: Beeper[] | void = (await getFileData<Beeper>(
      "beepers"
    )) as Beeper[];
    if (!beepers) beepers = [] as Beeper[];
    return beepers;
  }

  public static async createNewBeeper(
    newBeeper: NewBeeperDTO
  ): Promise<boolean> {
    //create a new Beeper() obg
    const { name } = newBeeper;
    const beeper: Beeper = new Beeper(name);

    //get all beepers list
    const beepers = await this.getAllBeepers();

    //push
    beepers.push(beeper);

    //save the beeper back to the beepers file
    const ifSaved: boolean = await saveFileData<Beeper>("beepers", beepers);
    return ifSaved;
  }

  private static setStatus(beeper: Beeper):string {
    switch (beeper.status) {
      case "manufactured":
        return "assembled";
      case "assembled":
        return "shipped";
      case "shipped":
        return "deployed";
    }
    return beeper.status;
  }

  public static async deleteBepeer(id: number):Promise<boolean>{
    const beepers:Beeper[] = await this.getAllBeepers();
    //מציאת אותו ביפר
    const listBeepersToSave:Beeper[] = beepers.filter((b:Beeper) => b.id != id);
    const ifSaved:boolean = await saveFileData<Beeper>("beepers" ,listBeepersToSave);
    return ifSaved;
  }

  public static async statusBeeper(beeper: Beeper): Promise<boolean> {
    try {
      const { id, status, create_at, detonated_at, latitude, longitude, name } =
        beeper;
      //to get all beepers
      const allBeepers: Beeper[] = await this.getAllBeepers();
      //to search in the beppers a beeper with same id and to like it and to replace it status
      const newBeepers: Beeper[] = allBeepers.map((b: Beeper) => {
        if (b.id == beeper.id) {
          return {
            id,
            status: this.setStatus(b),
            create_at,
            detonated_at,
            latitude,
            longitude,
            name
          };
        } else {
          return b;
        }
      });
      const ifSaved: boolean = await saveFileData<Beeper>("beepers", newBeepers);
      return ifSaved;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}

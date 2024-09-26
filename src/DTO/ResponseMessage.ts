import Beeper from "models/beeperModel";

export default interface ResponseMessage {
    err: boolean;
    message: string | Beeper[] | Beeper;
}
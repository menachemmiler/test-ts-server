import NewBeeperDTO from "../DTO/NewBeeperDTO";
import exp, { query, Request, Response, Router } from "express";
import beeperService from "../services/beeperService";
import ResponseMessage from "../DTO/ResponseMessage";
import Beeper from "models/beeperModel";

const router: Router = exp.Router();

//all functions here~~~~~~~~~~~~~~~~~~~~~~~~
const getBeeperById = async (id: number): Promise<ResponseMessage> => {
  //func to get beeper by id
  try {
    const allBeepers: Beeper[] =
      (await beeperService.getAllBeepers()) as Beeper[];
    const withSameId = allBeepers.filter((a) => {
      return a.id == id;
    });
    if (withSameId.length) {
      //אם מצא ביפר עם מזהה תואם
      return {
        err: false,
        message: withSameId[0],
      };
    } else {
      return {
        err: false,
        message: "אין ביפרים עם המזהה הזה",
      };
    }
  } catch (err: any) {
    return {
      err: true,
      message: "שגיאת חיפוש לפי מזהה",
    };
  }
};

const getBeeperByStatus = async (status: string): Promise<ResponseMessage> => {
  //func to get beeper by status
  try {
    const allBeepers: Beeper[] =
      (await beeperService.getAllBeepers()) as Beeper[];
    const withSameStatus = allBeepers.filter((a) => {
      return a.status == status;
    });
    if (withSameStatus.length) {
      //אם מצא ביפר עם סטטוס תואם
      return {
        err: false,
        message: withSameStatus[0],
      };
    } else {
      return {
        err: false,
        message: "אין ביפרים עם הסטטוס הזה",
      };
    }
  } catch (err: any) {
    return {
      err: true,
      message: "שגיאת חיפוש לפי סטטוס",
    };
  }
};
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// create new beeper
router.post(
  "/",
  async (
    req: Request<any, any, NewBeeperDTO>,
    res: Response
  ): Promise<void> => {
    try {
      const resulte: boolean = await beeperService.createNewBeeper(req.body);
      if (resulte) {
        res.status(201).json({
          err: false,
          message: "הביפר נשמר בהצלחה",
          data: undefined,
        });
      } else {
        res.json({
          err: true,
          message: "הביפר לא נשמר",
        });
      }
    } catch (err: any) {
      res.status(404).json({
        err: true,
        message: "שגיאה ב-שמירה",
      });
    }
  }
);

//get all beepers
router.get(
  "/",
  async (req: Request, res: Response<ResponseMessage>): Promise<void> => {
    try {
      const allBeepers: Beeper[] =
        (await beeperService.getAllBeepers()) as Beeper[];
      if (allBeepers) {
        res.status(200).json({
          err: false,
          message: allBeepers,
        });
      } else {
        res.status(404).json({
          err: true,
          message: "לא הצליח לקבל את הביפרים",
        });
      }
    } catch (err: any) {
      res.status(404).json({
        err: true,
        message: "לא הצליח לקבל את הביפרים",
      });
    }
  }
);

router.put(
  "/:id/status",
  async (req: Request, res: Response<ResponseMessage>): Promise<void> => {
    try {
      let getBeeper = await getBeeperById(parseFloat(req.params.id));
      if (getBeeper.err) {
        res.status(404).json(getBeeper);
      } else {
        const beeper = getBeeper.message;
        const changeStatus = await beeperService.statusBeeper(beeper as Beeper);
        if (!changeStatus) {
          res.status(404).json({
            err: true,
            message: "לא הצליח לשנות את הסטטוס",
          });
        }
        getBeeper = await getBeeperById(parseFloat(req.params.id));
        res.json({
          err: false,
          message: getBeeper.message,
        });
      }
    } catch (err: any) {
      res.status(404).json({
        err: true,
        message: "status eror",
      });
    }
  }
);

//get beeper by id
router.get(
  "/:id",
  async (req: Request, res: Response<ResponseMessage>): Promise<void> => {
    try {
      console.log(req.params.id);
      const resoulte = await getBeeperById(parseFloat(req.params.id));
      if (resoulte.err) {
        res.status(404).json(resoulte);
      } else {
        res.status(200).json(resoulte);
      }
    } catch (err: any) {
      res.status(404).json({
        err: true,
        message: `שגיאה בקבלת ביפר לפי מזהה${err}`,
      });
    }
  }
);

router.delete(
  "/:id",
  async (req: Request, res: Response<ResponseMessage>): Promise<void> => {
    try {
      const resoulte = await getBeeperById(parseFloat(req.params.id));
      if (resoulte.err) {
        res.status(404).json(resoulte); //בעיה במציאת אותו הביפר
      } else {
        const isDeleted: boolean = await beeperService.deleteBepeer(
          parseFloat(req.params.id)
        );
        if (!isDeleted)
          res.status(500).json({ err: true, message: "בעיה במחיקה" });
        res.status(200).json({ err: true, message: "נמחק בהצלחה" });
      }
    } catch (err: any) {
      res.status(404).json({
        err: true,
        message: `שגיאה בקבלת ביפר לפי מזהה${err}`,
      });
    }
  }
);

// //get beper by status
// router.get(
//   "/status/:status",
//   async (req: Request, res: Response<ResponseMessage>): Promise<void> => {
//     try {
//       console.log(req.params.id);
//       const resoulte = await getBeeperById(parseFloat(req.params.id));
//       if (resoulte.err) {
//         res.status(404).json(resoulte);
//       } else {
//         res.status(200).json(resoulte);
//       }
//     } catch (err: any) {
//       res.status(404).json({
//         err: true,
//         message: `שגיאה בקבלת ביפר לפי מזהה${err}`,
//       });
//     }
//   }
// );

export default router;

import {drawSheet,defaultLineWidth,logLevel} from "./animate.js";
import {fitCircleToPoints} from "./calculation.js";


class Entity {
    constructor(type,Entityproperties) {
        this.type = type;
        this.Entityproperties = Entityproperties;
    }

    draw() {
    }

    findValueFloat(propertyType) {
        for (let i=0;i< this.Entityproperties.length;i++)   {
            if (this.Entityproperties[i].propertyType === propertyType) {
                return parseFloat(this.Entityproperties[i].propertyValue);
            }
        }
        return null;

    }

    findValueString(propertyType) {
        for (let i=0;i< this.Entityproperties.length;i++)   {
            if (this.Entityproperties[i].propertyType === propertyType) {
                logLevel >5 ? console.log("findValueString this.Entityproperties[i].propertyValue)",this.Entityproperties[i].propertyValue):null
                return this.Entityproperties[i].propertyValue;
            }
        }
        return null;

    }

    findValueNum(propertyType) {
        for (let i=0;i< this.Entityproperties.length;i++)   {
            if (this.Entityproperties[i].propertyType === propertyType) {
                logLevel >5 ? console.log("findValueNum this.Entityproperties[i].propertyValue)",this.Entityproperties[i].propertyValue):null;
                return parseInt(this.Entityproperties[i].propertyValue);
            }
        }
        return null;

    }



    isHasValue(propertyType) {
        for (let i=0;i< this.Entityproperties.length;i++)   {
            if (this.Entityproperties[i].propertyType === propertyType) {
                return true;
            }
        }
        return false;
    }

    findValues(propertyType) {
        let entityPropertiesValue = [];
        for (let i=0;i< this.Entityproperties.length;i++)   {
            if (this.Entityproperties[i].propertyType === propertyType) {
                entityPropertiesValue[i].push(this.Entityproperties[i].propertyValue);
            }
        }
        return entityPropertiesValue;
    }

    getPoint(xType,yType){
        let point = {};
        for (let i=0;i< this.Entityproperties.length;i++)   {
            this.Entityproperties[i].propertyType === xType ? point.x = this.Entityproperties[i].propertyValue: null;
            this.Entityproperties[i].propertyType === yType ? point.y = this.Entityproperties[i].propertyValue: null;
            if (point.x != null && point.y != null) {
                break;
            }
        }
        return point;


    }

    getAllPoints(isHasBulge41,bulgeType,){
        let points_g = []
        logLevel >5 ? console.log("ActiualpointsLEEEETTTT points_g",points_g):null;
        let point_g = {};
        for (let i=0;i< this.Entityproperties.length;i++)   {

            this.Entityproperties[i].propertyType === ' 10' ? point_g.x = this.Entityproperties[i].propertyValue == null ? 0.0 : this.Entityproperties[i].propertyValue : null;
            this.Entityproperties[i].propertyType === ' 20' ? point_g.y = this.Entityproperties[i].propertyValue == null ? 0.0 : this.Entityproperties[i].propertyValue : null;
            this.Entityproperties[i].propertyType === bulgeType ? point.b = this.Entityproperties[i].propertyValue == null ? 1.0 : this.Entityproperties[i].propertyValue : null;
            if (isHasBulge41) {
                if (point_g.x != null && point_g.y != null && point_g.b != null) {
                    points_g.push(point_g)
                    point_g = {};

                }
            }
            else  {
                if (point_g.x != null && point_g.y != null) {
                    points_g.push(point_g)
                    point_g = {};

                }
            }
        }
        logLevel >5 ? console.log("Allpoints",points_g):null;
        return points_g;
    }

    drawBulgeBetweenTwoPoints(p1, p2, drawContext) {
        logLevel >5 ? console.log("p1",p1):null;
        logLevel >5 ? console.log("p2",p2):null;
        //kisz??m??tjuk a szakasz hossz??t
        let lengthOfSection = Math.sqrt(Math.pow(p1.startX - p2.startX, 2) + Math.pow(p1.startY - p2.startY, 2));
        logLevel >5 ? console.log("lengthOfSection",lengthOfSection):null;
        //megkeress??k a dombor??tand?? szakasz k??zep??t ??s elt??roljuk mert-e k??r??l fogunk forgatni.
        //Az??rt-e k??r??l forgatunk, mert a 41-es entitaspropertstartY a szakasz fel??t ar??nstartYos??tja.
        let middleOfSection = {
            x: ((p1.startX + p2.startX) / 2),
            y: ((p1.startY + p2.startY) / 2)
        }
        logLevel >5 ? console.log("middleOfSection",middleOfSection):null;
        //A forgatand?? pontot levissz??k az orig??ba ??s
        // elforgatjuk 90 fokkal az ??ramutat?? j??r??sa??val ellent??tesen
        let rotation90StartPoint = {
            x: (p1.startY - middleOfSection.y),
            y: (-1 * (p1.startX - middleOfSection.x))
        }
        logLevel >5 ? console.log("rotation90StartPoint",rotation90StartPoint):null;
        //kisz??moljuk a dombor??t??s tetej??t, a dombort??s ar??ny??t a 41-es entit??spoperty hordozza.
        let endPoint = {
            x: rotation90StartPoint.x * 1 / p1.b,
            y: rotation90StartPoint.y * 1 / p1.b
        }
        logLevel >5 ? console.log("endPoint",endPoint):null;
        //meg??llap??tjuk a szakszmer??leges hossz??t.
        let perpendicularSectionLength = Math.sqrt(Math.pow(rotation90StartPoint.x, 2) + Math.pow(rotation90StartPoint.y, 2));
        logLevel >5 ? console.log("perpendicularSectionLength",perpendicularSectionLength):null;
        //Ezut??n visszavissz??k az eredeti hely??re a v??gpontot.
        endPoint.x = endPoint.x + middleOfSection.x;
        endPoint.y = endPoint.y + middleOfSection.y;

        logLevel >5 ? console.log("NewendPoint",endPoint):null;
        //Kisz??m??tjuk az ??v bez??rt sz??get.
        //ehhez sz??ks??ge??nk van a szakaszmer??leges hossz??ra, amit m??r kisz??moltunk,
        // mert ??gy tudunk der??ksz??g?? h??romsz??ggel sz??molni
        //L??tehozzuk a k??r?? ??rhat?? h??romsz??get
        let datas = fitCircleToPoints(p1.startX, p1.startY, p2.startX, p2.startY, endPoint.x, endPoint.y);
        logLevel >5 ? console.log("sin", (lengthOfSection / 2) / datas.radius):null;
        logLevel >5 ? console.log("datas",datas):null;
        //Meghat??rozzuk a sz??geket
        let startAngle = Math.atan2(p1.startY - datas.y, p1.startX - datas.x);
        let endAngle = Math.atan2(p2.startY - datas.y, p2.startX - datas.x);
        logLevel >5 ? console.log("startAngle",startAngle):null;
        logLevel >5 ? console.log("startAngle",endAngle):null;
        //Forg??s??r??ny meghat??roz??s
        let antiClockWise;
        if (p1.b > 0)
            antiClockWise = false;
        else
            antiClockWise = true;
        drawContext.beginPath();
        //V??gre rajzolunk. Ez kem??ny volt! :-)
        drawContext.arc(datas.x, datas.y, datas.radius, startAngle, endAngle, antiClockWise);
        drawContext.stroke();
    }

}

export {Entity};
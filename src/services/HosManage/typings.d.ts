declare namespace HosManage {
  type BloodBoxItem = {
    boxid: number;
    rfid: string;
    mintemp: number;
    maxtemp: number;
    temp: number;
    islock: number;
    isout: number;
    status: number;
    batterypower: number;
    ischarge: number;
    isalert: number;
  };
  type BloodFridgeItem = {
    id: number;
    rfid: string;
    mintemp: number;
    maxtemp: number;
    brand: string; //品牌
    specification: string; //规格
    temp: number;
    name: number;
    isout: number;
    status: number;
    ischarge: number;
    isalert: number;
  };
}

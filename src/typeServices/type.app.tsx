export interface MachineListType {
  id: number;
  iD_TB: number;
  mS_MAY: string;
  teN_MAY: string;
  kW_DAT: string;
  phaN_TRAM_DAT: number;
  kW_CHUA_DAT: string;
  phaN_TRAM_CHUA_DAT: number;
  chI_PHI_DAT: string;
  chI_PHI_CHUA_DAT: string;
  online: boolean;
  tinH_TRANG: number;
}

// Monitor
export interface MonitorType {
  thongKeLoiVanHanh: ThongKeLoiVanHanhItem[];
  thongSoVanHanh: ThongSoVanHanhItem[];
  typE_MACHINE: number;
  loI_BT: string;
}

interface ThongKeLoiVanHanhItem {
  color: string;
  gioI_HAN: number;
  iD_ND: number;
  teN_HIEN: string;
  teN_ND: string;
  thuC_TE: number;
  coloR_OPACITY: string;
}

interface ThongSoVanHanhItem {
  color: string;
  gioI_HAN: number;
  gioI_HAN_2: number;
  iD_ND: number;
  teN_ND: string;
  thuC_TE: number;
}

// Consume Screen

export interface ConsumeType {
  dienNangTieuThu: DienNangTieuThu[];
  dienNangHuuIch: DienNangHuuIch[];
  thoiGianChayMay: ThoiGianChayMay[];
  hieuQuaDienNang: HieuQuaDienNang[];
}
export interface DienNangTieuThu {
  id: number;
  teN_BD: string;
  teN_ND: string;
  giA_TRI: number;
  phaN_TRAM: number;
  color: string;
  typE_BD: number;
}

interface DienNangHuuIch {
  id: number;
  valuE_HU: number;
  phaN_TRAM_HU: number;
  coloR_HU: string;
  valuE_LP_KT: number;
  phaN_TRAM_LP_KT: number;
  coloR_LP_KT: string;
  valuE_HST: number;
  phaN_TRAM_HST: number;
  coloR_HST: string;
  doN_VI: string;
  teN_ND_HU: string;
  teN_ND_LP: string;
  teN_ND_HST: string;
}

interface ThoiGianChayMay {
  id: number;
  teN_ND_CO_TAI: string;
  valuE_CO_TAI: number;
  phaN_TRAM_CO_TAI: number;
  coloR_CO_TAI: string;
  teN_ND_KHONG_TAI: string;
  valuE_KHONG_TAI: number;
  phaN_TRAM_KHONG_TAI: number;
  coloR_KHONG_TAI: string;
}

interface HieuQuaDienNang {
  id: number;
  teN_ND_THAM_CHIEU: string;
  valuE_THAM_CHIEU: number;
  teN_ND_THUC_TE: string;
  valuE_THUC_TE: number;
  coloR_THAM_CHIEU: string;
  coloR_THUC_TE: string;
}

//realtime

export interface DataRealTime {
  bieudo1: BieuDo1[];
  bieudo2: BieuDo2[];
  bieudo3: BieuDo3[];
  bieudo4: BieuDo4[];
}

interface BieuDo1 {
  id: number;
  teN_ND: string;
  teN_ND_A: string;
  miN_VALUE: number;
  maX_VALUE: number;
  value: string;
  phaN_TRAM: number;
  coloR_OPACITY: string;
  color: string;
  iD_TB: number;
}

interface BieuDo2 {
  coloR_OPACITY: string;
  color: string;
  gioI_HAN: number;
  iD_TB: number;
  id: number;
  teN_ND: string;
  type: number;
  value: number;
}

interface BieuDo3 {
  coloR_OPACITY: string;
  color: string;
  iD_TB: number;
  id: number;
  phaN_TRAM: number;
  teN_BD: string;
  teN_ND: string;
  giA_TRI: number;
}

interface BieuDo4 {
  coloR_OPACITY: string;
  color: string;
  iD_TB: number;
  id: number;
  phaN_TRAM: number;
  teN_BD: string;
  teN_BD_A: string;
  teN_ND: string;
  teN_ND_A: string;
  value: number;
}

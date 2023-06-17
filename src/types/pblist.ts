import { MouseEvent } from "react";

export interface ICompanyListProps {
  companyList: ICompanyList;
  nowCompany: string;
}

export interface ISpecialityListProps {
  nowSpeciality: string;
  handleIDClick: (e: MouseEvent<HTMLUListElement>) => void;
}

export type TSpeciality =
  | "KOREAN_STOCK"
  | "US_STOCK"
  | "DERIVATIVE"
  | "FUND"
  | "ETF"
  | "REAL_ESTATE"
  | "BOND"
  | "WRAP"
  | null;
export interface ISpecialityData {
  id: string;
  text: TSpeciality;
}

export interface ISpecialityList extends Array<ISpecialityData> {}

export interface ICompany {
  id: number;
  logo: string;
  name: string;
}

export interface ICompanyList extends Array<ICompany> {}

export interface IPropensityList {
  [key: string]: {
    propensity: string;
    bar: number;
    lossRisk: string;
    pursuit: string;
    productRisk: string;
  };
}

export interface IPropensityCardProps {
  userPropensity: IPropensity;
}

export type IPropensity = "CONSERVATIVE" | "CAUTIOUS" | "BALANCED" | "AGGRESSIVE" | "SPECULATIVE" | null;

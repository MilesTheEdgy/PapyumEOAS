import React from "react";
import { useSelector } from "react-redux";
import "./anasayfatable.css"
import TumTeklifler from "./tables/tumteklifler/TumTeklifler"
import SizinTeklifleriniz from "./tables/sizinteklifleriniz/SizinTeklifleriniz";
import { TUM_TEKLIFLER, BEKELEYEN_TEKLIFLER, BAKIYE_HAREKETLERI, SIZIN_TEKLIFLERINIZ } from "src/store";

const AnasayfaTable = () => {
  const dashboardTable = useSelector(state => state.dashboardTable)

  const renderAuthButton = () => {
    switch (dashboardTable) {
      case TUM_TEKLIFLER:
        return <TumTeklifler />

      case BEKELEYEN_TEKLIFLER:
        return <TumTeklifler />

      case BAKIYE_HAREKETLERI:
        return <TumTeklifler />

      case SIZIN_TEKLIFLERINIZ:
        return <SizinTeklifleriniz />
          
      default:
        break;
    }
  }
  
  return (
    <>
      {renderAuthButton()}
    </>
  )

}

export default AnasayfaTable
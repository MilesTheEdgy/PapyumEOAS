import { createStore } from 'redux'

//Actions
export const SIZIN_TEKLIFLERINIZ = "SIZIN_TEKLIFLERINIZ";
export const BEKELEYEN_TEKLIFLER = "BEKELEYEN_TEKLIFLER";
export const BAKIYE_HAREKETLERI = "BAKIYE_HAREKETLERI";
export const TUM_TEKLIFLER = "TUM_TEKLIFLER";
//

const initialState = {
  sidebarShow: 'responsive',
  modals: {
    yeniTeklifModal: false
  },
  dashboardTable: TUM_TEKLIFLER
}

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return {...state, ...rest }
    case 'YENI_TEKLIF_ON':
      return {
        ...state,
        modals: {
          ...state.modals,
          yeniTeklifModal: true
        }
      }
    case 'YENI_TEKLIF_OFF':
      return {
        ...state,
        modals: {
          ...state.modals,
          yeniTeklifModal: false
        }
      }
    case 'SET_DASHBOARD_TABLE':
      return {
        ...state,
        ...rest
      }
    default:
      return state
  }
}

const store = createStore(changeState)
export default store
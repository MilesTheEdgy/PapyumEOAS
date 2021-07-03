import { createStore } from 'redux'

const initialState = {
  sidebarShow: 'responsive',
  modals: {
    yeniTeklifModal: false
  }
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
    default:
      return state
  }
}

const store = createStore(changeState)
export default store
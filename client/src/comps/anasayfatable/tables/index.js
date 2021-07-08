import { CollapseMine, CollapseJoin } from "./tumteklifler/Collapsed"

export const initialState = {
  rows: [],
  totalPledges: 0,
  pickedRows: [],
  isCollapsed: false,
}

export function reducer (state, action) {
  switch(action.type) {
    
    case "TOGGLE_ECZANE":
      const index = state.rows.findIndex(row => row.name ===action.payload)
      const newArray = [...state.rows]
      newArray[index].clicked = !state.rows[index].clicked

      if (newArray[index].clicked === true) {
        return {
          ...state,
          rows: newArray,
          pickedRows: [
            ...state.pickedRows,
            newArray[index]
          ]
        }
      } else {
        const pickedRowsCopy = state.pickedRows
        const idxToRemove = pickedRowsCopy.findIndex(row => row.name ===action.payload)
        pickedRowsCopy.splice(idxToRemove, 1)
        return {
          ...state,
          rows: newArray,
          pickedRows: pickedRowsCopy
        }
      }


    case "ADD_ROW":
      return {
        ...state,
        rows: [
          ...state.rows,
          action.payload
        ]
      }
    
    case "HEDEF_HESAPLA":
      const posterPledge = action.payload
      const toplamHedef = state.pickedRows.reduce((accumulator, current) => accumulator + current.pledged, posterPledge);
      return {
        ...state,
        totalPledges: toplamHedef
      }
    
    default:
      return state
  }
}

// checks if number is below 0, returns a string, I used it for color styling
export function isBelow0 (number) {
  if (number < 0) {
    return "red"
  } else {
    return "green"
  }
}

export const fields = [
  { key: 'eczane', _style: { width: '10%'} },
  { key: 'İlaç', _style: { width: '30%'} },
  'hedef',
  'birimFiyat',
  'kampanya',
  'sonTarih',
  'durum',
  {
    key: 'show_details',
    label: '',
    _style: { width: '1%' },
    sorter: false,
    filter: false
  }
]

export function getBadge (status) {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'beklemede': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}

export function toggleDetails(index, details, setDetails, setOrder, setTotal, setBakiyeSonra) {
    const position = details.indexOf(index)
    let newDetails = details.slice()
    if (position !== -1) {
        newDetails.splice(position, 1)
    } else {
        setOrder(0);
        setTotal(0);
        setBakiyeSonra(0);
        newDetails = [index]
    }
    setDetails(newDetails)
    }

export function whichCollapsedToRender (reduxUser, dataUser, item, index, setOrder, total, bakiyeSonra) {
  if (reduxUser === dataUser) {
    return <CollapseMine item = {item} index = {index} setOrder = {setOrder} total = {total} bakiyeSonra = {bakiyeSonra} />
  } else {
    return <CollapseJoin item = {item} index = {index} setOrder = {setOrder} total = {total} bakiyeSonra = {bakiyeSonra} />
  }
}
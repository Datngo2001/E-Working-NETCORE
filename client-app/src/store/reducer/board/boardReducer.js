import { CREATE_CARD_FAILURE, CREATE_CARD_REQUEST, CREATE_CARD_SUCCESS, CREATE_COLUMN_FAILURE, CREATE_COLUMN_REQUEST, CREATE_COLUMN_SUCCESS, DELETE_CARD_FAILURE, DELETE_CARD_REQUEST, DELETE_CARD_SUCCESS, DELETE_COLUMN_FAILURE, DELETE_COLUMN_REQUEST, DELETE_COLUMN_SUCCESS, LOAD_BOARD_FAILURE, LOAD_BOARD_REQUEST, LOAD_BOARD_SUCCESS, MOVE_CARD_FAILURE, MOVE_CARD_REQUEST, MOVE_CARD_SUCCESS, UPDATE_CARD_FAILURE, UPDATE_CARD_REQUEST, UPDATE_CARD_SUCCESS, UPDATE_COLUMN_FAILURE, UPDATE_COLUMN_REQUEST, UPDATE_COLUMN_SUCCESS } from "./boardActionTypes"

const init = {
    board: {},
    loading: false,
    error: {
        action: "",
        message: null
    }
}

export default function boardReducer(state = init, { type, payload }) {
    switch (type) {
        case LOAD_BOARD_REQUEST:
        case CREATE_CARD_REQUEST:
        case CREATE_COLUMN_REQUEST:
        case UPDATE_CARD_REQUEST:
        case UPDATE_COLUMN_REQUEST:
        case DELETE_CARD_REQUEST:
        case DELETE_COLUMN_REQUEST:
        case MOVE_CARD_REQUEST:
            return {
                ...state,
                loading: true,
                error: {
                    action: "",
                    message: null
                }
            }
        case LOAD_BOARD_FAILURE:
        case CREATE_CARD_FAILURE:
        case CREATE_COLUMN_FAILURE:
        case UPDATE_CARD_FAILURE:
        case UPDATE_COLUMN_FAILURE:
        case DELETE_CARD_FAILURE:
        case DELETE_COLUMN_FAILURE:
        case MOVE_CARD_FAILURE:
            return {
                ...state,
                loading: true,
                error: {
                    action: "",
                    message: null
                }
            }
        case LOAD_BOARD_SUCCESS:
            return {
                ...state,
                board: payload,
                loading: false,
                error: {
                    action: "",
                    message: null
                }
            }

        case CREATE_CARD_SUCCESS:
            return {
                ...state,
                board: addCardToColumn(state.board, payload),
                loading: false,
                error: {
                    action: "",
                    message: null
                }
            }

        case CREATE_COLUMN_SUCCESS:
            state.board.columns.push(payload)
            return {
                ...state,
                loading: false,
                error: {
                    action: "",
                    message: null
                }
            }

        case UPDATE_CARD_SUCCESS:
            return {
                ...state,
                board: updateCardToColumn(state.board, payload),
                loading: false,
                error: {
                    action: "",
                    message: null
                }
            }

        case UPDATE_COLUMN_SUCCESS:
            return {
                ...state,
                board: updateColumnInBoard(state.board, payload),
                loading: false,
                error: {
                    action: "",
                    message: null
                }
            }

        case DELETE_CARD_SUCCESS:
            return {
                ...state,
                board: removeCard(state.board, payload),
                loading: false,
                error: {
                    action: "",
                    message: null
                }
            }

        case DELETE_COLUMN_SUCCESS:
            return {
                ...state,
                board: removeColumn(state.board, payload),
                loading: false,
                error: {
                    action: "",
                    message: null
                }
            }
        case MOVE_CARD_SUCCESS:
            return {
                ...state,
                board: moveCard({ ...state.board }, payload),
                loading: false,
                error: {
                    action: "",
                    message: null
                }
            }
        default:
            return state
    }
}

function addCardToColumn(board, newCard) {
    let column = board.columns.find(c => c.id === newCard.columnId)
    column.cards.push(newCard)
    return board
}

function updateCardToColumn(board, updateCard) {
    let column = board.columns.find(c => c.id === updateCard.columnId)
    let index = column.cards.findIndex(c => c.id === updateCard.id);
    column.cards[index] = updateCard
    return board
}

function updateColumnInBoard(board, updateColumn) {
    let index = board.columns.findIndex(c => c.id === updateColumn.id);
    for (const [key, val] of Object.entries(updateColumn)) {
        if (key === "cards") continue
        board.columns[index][key] = val
    }
    return board
}

function removeCard(board, deletedCard) {
    let column = board.columns.find(c => c.id === deletedCard.columnId)
    var index = column.cards.findIndex(stage => stage.id === deletedCard.id)
    column.cards.splice(index, 1)
    return board
}

function moveCard(board, newCard) {
    // remove exist card
    board.columns.forEach(col => {
        let index = col.cards.findIndex(c => c.id === newCard.id)
        if (index > -1) {
            col.cards.splice(index, 1)
        }
    })
    // add card to new column
    let column = board.columns.find(c => c.id === newCard.columnId)
    column.cards.push(newCard)
    return board
}

function removeColumn(board, deletedColumn) {
    var index = board.columns.findIndex(stage => stage.id === deletedColumn.id)
    board.columns.splice(index, 1)
    return board
}

import * as actionTypes from './actionTypes';
import assign from 'lodash/fp/assign';
import set from 'lodash/fp/set';

let initialState = {
    slide: 0,
    fragment: -1
};

function moveNext(state) {
    let {slide, fragment, depthList} = state,
      slidesCount = depthList.length;

    if (fragment + 1 < depthList[slide]) {
        return {
            fragment: fragment + 1
        }
    } else if (slide + 1 < slidesCount) {
        return {
            fragment: -1,
            slide: slide + 1
        }
    }
}

function movePrev(state) {
    let {slide, fragment, depthList} = state;

    if (state.fragment >= 0) {
        return {
            fragment: fragment - 1
        }
    } else if (slide > 0) {
        return {
            fragment: depthList[slide - 1] - 1,
            slide: slide - 1
        }
    }
}

export default (action, state = initialState) => {
    let {payload} = action;

    switch (action.type) {
        case actionTypes.LOAD_DEPTH_LIST:
            return set(['depthList'], payload, state);
        case actionTypes.NEXT:
            return assign(state, moveNext(state));
        case actionTypes.PREV:
            return assign(state, movePrev(state));
        case actionTypes.SET_SLIDE:
            return assign(state, {
                fragment: -1,
                slide: payload
            });
    }

    return state;
}

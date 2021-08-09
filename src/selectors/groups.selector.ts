import { createSelector } from "reselect";
import { groupStateSelector } from "./app.selectors";
// export const groupQuerySelector =createSelector([groupStateSelector],
//     (groupState)=>groupState.query);
    
//     )


// eslint-disable-next-line @typescript-eslint/no-use-before-define
// export const groupByIdSelector=(state:AppState)=>{
//     const groupState=groupStateSelector(state);
//     return groupState.groupIds;
// }
export const groupByIdSelector=createSelector(
    [groupStateSelector],
    (groupState)=>groupState.groupIds
)

// export const groupQueryMapSelector=(state:AppState)=>{
//     const groupState=groupStateSelector(state);
//     return groupState.groupQueryMap;
// }
export const groupQueryMapSelector=createSelector(
    [groupStateSelector],
    (groupState)=>groupState.groupQueryMap
)

// export const groupQuerySelector =(state: AppState)=>{
//     const groupState=groupStateSelector(state);
//     return groupState.groupQuery;
// }
export const groupQuerySelector =createSelector(
    [groupStateSelector],
    (groupState)=>groupState.groupQuery
)
// export const groupSelector =(state: AppState)=>{
//     const groupIds=state.groups.queryMap[state.groups.query] || [];
//     const groupState=groupStateSelector(state);
//     const groups =groupIds.ap((id)=> groupState.byId[id]);
//     return groups;
// }
export const groupSelector =createSelector([groupQuerySelector,groupByIdSelector,groupQueryMapSelector],(query,byId,queryMap)=>{
    const groupIds=queryMap[query] || [];
    const groups=groupIds.map((id)=>byId[id]);
    return groups;
    })

// const groupLoadingQuerySeletor = createSelector([groupStateSelector],(groupState)=>(query,loadingMap)=>loadingMap[query] );
// const groupLoadingSelector=createSelector([groupStateSelector])
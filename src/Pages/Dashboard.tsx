import React, {  useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { groupaction } from "../actions/group.actions";
import { fetchGroups } from "../api/group";
import Card from "../Components/Card";
import Header from "../Components/Header";
import Loading_icon from "../Components/Loading_icon.gif";
import Sidebar from "../Components/Sidebar";
import { AppState, useAppSelector } from "../store";
interface props {}
const Dashboard: React.FC<props> = () => {
  const dispatch = useDispatch();

  const query = useAppSelector((state) => state.group.groupQuery);
  const [loading, setloading] = useState(false);
  const [offset, setOffset] = useState(0);
  const group: any = useAppSelector((state) => {
    const groupIds = state.group.groupQueryMap[state.group.groupQuery] || [];
    const groups = groupIds.map((id: any) => state.group.groups[id]);
    return groups;
  });
  console.log(group, "main");
  useEffect(() => {
    setloading(true);
    setTimeout(() => {
      setloading(false);
    }, 2000);
    fetchGroups({ status: "all-groups", query: query, offset: offset })
      .then((response) => {
// dispatch({
        //   type: "groups/query_completed",
        //   payload: { groups: response, query },
        // });
        //setGroup(response.data.data);
        console.log(response,"ytree");
        groupaction.groupsfetch( response.data, query) // eslint-disable-line react-hooks/exhaustive-deps
      })
      .catch((error) => {
        console.log(error);
      });
  }, [query, offset]);
  var value = "";
  const change = (e: any) => {
    value = e.currentTarget.value;
    groupaction.groupquery(value)
    //dispatch({ type: "groups/query", payload: value });
  };
  console.log(group);
  return (
    <>
      <Header />

      <Sidebar />
      <div className="mt-28 md:ml-64 flex  justify-center justify-items-center text-center">
        <div className="  border-b-2 pb-3 w-1/2">
          <input
            name="password"
            className="outline-none"
            id="password"
            placeholder="Type things to search"
            onChange={change}
          />
        </div>
      </div>
      {loading ? (
        <div className=" md:ml-64 flex  justify-center h-40">
          <img className=" " src={Loading_icon} />{" "}
        </div>
      ) : (
        ""
      )}
      <div className=" md:ml-60 p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
        {group.length > 0 ? (
          group.map((element: any, index: number) => {
            return (
              <>
                <Card
                  id={element.id}
                  creator={" "}
                  chatCount={element.chatCount}
                  key={element.id}
                  group_image_url={element.group_image_url}
                  name={element.name}
                  description={element.description}
                ></Card>
              </>
            );
          })
        ) : (
          <div className="text-3xl  font-medium"> No results</div>
        )}
      </div>
    </>
  );
};

Dashboard.defaultProps = {};

export default React.memo(Dashboard);

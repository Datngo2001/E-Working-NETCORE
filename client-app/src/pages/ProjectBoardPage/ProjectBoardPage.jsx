import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import KanBanBoard from "../../features/KanBanBoard/KanBanBoard";
import { LOAD_PROJECT_REQUEST } from "../../store/reducer/project/projectActionTypes";
import { CLEAR_CURRENT_STAGE } from "../../store/reducer/stage/stageActionTypes";

function ProjectBoardPage() {
  const { projectId } = useParams();
  const { currentProject } = useSelector((state) => state.project);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: LOAD_PROJECT_REQUEST, payload: projectId });
    return () => {
      dispatch({ type: CLEAR_CURRENT_STAGE });
    };
  }, [projectId]);

  return (
    <div className="custom-scroll" style={{ height: "100%" }}>
      {currentProject?.id === projectId && (
        <KanBanBoard projectId={projectId} />
      )}
    </div>
  );
}

export default ProjectBoardPage;

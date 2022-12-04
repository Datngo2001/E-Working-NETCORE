import { Box } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import AppSkeleton from "../../components/AppSkeleton";
import KanBanBoard from "../../features/KanBanBoard/KanBanBoard";
import { useQuery } from "../../hooks/useQuery";
import { CLEAR_BOARD } from "../../store/reducer/board/boardActionTypes";
import { LOAD_PROJECT_REQUEST } from "../../store/reducer/project/projectActionTypes";
import { CLEAR_CURRENT_STAGE } from "../../store/reducer/stage/stageActionTypes";

function ProjectBoardPage() {
  const { projectId, stageId } = useParams();
  const { currentProject } = useSelector((state) => state.project);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: LOAD_PROJECT_REQUEST, payload: projectId });
    return () => {
      dispatch({ type: CLEAR_CURRENT_STAGE });
      dispatch({ type: CLEAR_BOARD });
    };
  }, [projectId]);

  return (
    <div className="custom-scroll" style={{ height: "100%" }}>
      {currentProject?.id === projectId ? (
        <KanBanBoard projectId={projectId} stageId={stageId} />
      ) : (
        <Box sx={{ display: "flex", gap: 2, padding: 2 }}>
          <AppSkeleton />
          <AppSkeleton />
          <AppSkeleton />
          <AppSkeleton />
        </Box>
      )}
    </div>
  );
}

export default ProjectBoardPage;

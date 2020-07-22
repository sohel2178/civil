import React, { useRef } from "react";

import ProjectCard from "./item_project";

import {
  Grid,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
} from "react-virtualized";

// const date = new Date().toISOString()

const ProjectGrid = ({ projects, setSelected }) => {
  const cache = useRef(
    new CellMeasurerCache({
      defaultHeight: 400,
      fixedWidth: true,
    })
  );

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <AutoSizer>
        {({ width, height }) => (
          <Grid
            cellRenderer={({ columnIndex, key, rowIndex, style, parent }) => {
              const project = projects[rowIndex * 3 + columnIndex];
              return (
                <CellMeasurer
                  key={key}
                  cache={cache.current}
                  columnIndex={columnIndex}
                  rowIndex={rowIndex}
                  parent={parent}
                >
                  <div style={style}>
                    {project ? (
                      <ProjectCard
                        project={project}
                        setSelected={setSelected}
                      />
                    ) : null}
                    {/*  {project ? (
                      <DeviceCard device={device} setDevice={setDevice} />
                    ) : null} */}
                  </div>
                </CellMeasurer>
              );
            }}
            columnCount={3}
            columnWidth={Math.floor(width / 3.1)}
            height={height}
            rowCount={Math.ceil(projects.length / 3)}
            // rowCount={20}
            rowHeight={cache.current.rowHeight}
            width={width}
            estimatedColumnSize={3}
          />
        )}
      </AutoSizer>
    </div>
  );
};

export default ProjectGrid;

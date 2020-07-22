import React, { useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";

import {
  CardHeader,
  Card,
  CardContent,
  CardActions,
  Avatar,
  Grid as SGrid,
  Typography,
  Divider,
  Fab,
  Button,
} from "@material-ui/core";

import {
  Grid,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
} from "react-virtualized";

const useStyle = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    minWidth: "95%",
    marginLeft: "5%",
    marginRight: "5%",
    marginTop: "2%",
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
  },
  typo: {
    fontSize: "0.9rem",
    padding: 4,
  },
  fab: {
    marginRight: 8,
  },
}));

// const date = new Date().toISOString()

const ProjectCard = ({ project, setSelected }) => {
  const classes = useStyle();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="driver_photo" className={classes.avatar}>
            P
          </Avatar>
        }
        title={project.name}
        subheader={"Created at " + new Date(project.created_at).toDateString()}
      />
      <Divider />

      <CardContent>
        <SGrid container direction="column">
          <SGrid item container justify="space-between">
            <Typography className={classes.typo}>Start Date</Typography>
            <Typography className={classes.typo}>
              {new Date(project.start_date).toDateString()}
            </Typography>
          </SGrid>

          <SGrid item container justify="space-between">
            <Typography className={classes.typo}>Completion Date</Typography>
            <Typography className={classes.typo}>
              {new Date(project.completion_date).toDateString()}
            </Typography>
          </SGrid>

          <SGrid item container justify="space-between">
            <Typography className={classes.typo}>Project Location</Typography>
            <Typography className={classes.typo}>{project.location}</Typography>
          </SGrid>

          <SGrid item container justify="space-between">
            <Typography className={classes.typo}>
              Project Description
            </Typography>
            <Typography className={classes.typo}>
              {project.description}
            </Typography>
          </SGrid>
        </SGrid>
      </CardContent>
      <Divider />
      <CardActions>
        <SGrid container direction="column">
          <SGrid item container justify="center">
            <Fab color="secondary" size="small" className={classes.fab} />
            <Fab color="secondary" size="small" className={classes.fab} />
            <Fab color="secondary" size="small" className={classes.fab} />
            <Fab color="secondary" size="small" className={classes.fab} />
          </SGrid>
          <Typography
            variant="body1"
            style={{ textAlign: "center", padding: 8 }}
          >
            Actions
          </Typography>

          <SGrid item container justify="space-between">
            <Button variant="outlined" style={{ fontSize: "0.7rem" }}>
              Task
            </Button>
            <Button
              variant="outlined"
              style={{ fontSize: "0.7rem" }}
              onClick={() => setSelected(2)}
            >
              FINANCE
            </Button>
            <Button variant="outlined" style={{ fontSize: "0.7rem" }}>
              STOTE
            </Button>
            <Button variant="outlined" style={{ fontSize: "0.7rem" }}>
              EMPLOYEE
            </Button>
          </SGrid>
        </SGrid>
      </CardActions>
    </Card>
  );
};

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
        width: "90%",
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

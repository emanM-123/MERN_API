import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import InputLabel from "@material-ui/core/InputLabel";
import { useStore } from "laco-react";
import Box from "@material-ui/core/Box";
import { useSnackbar } from "notistack";
import DialogActions from "../component/DialogActions";
import TextField from "../component/TextField";
import Button from "../component/Button";
import { createTask, editTask, getAllTask } from "../services";
import { TaskStore } from "./TaskStore";
import TextareaAutosize from "../component/Textarea";
// import BasicDatePicker from "../component/DatePickers";
import DatePicker from "../component/DatePicker";
const useStyles = makeStyles((theme) => ({
  createBtn: {
    borderRadius: 5,
  },

  applyFilterBtn: {
    borderRadius: 5,
  },
  inputLabel: {
    padding: 5,
    fontSize: 20,
    fontWeight: "bold",
  },
}));

export default function CreateTask() {
  const classes = useStyles();

  const { selectedEditObj, isOpenDialog, listData, showDetails } =
    useStore(TaskStore);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const action = (key) => (
    <Button
      onClick={() => {
        closeSnackbar(key);
      }}
    >
      {"Dismiss"}
    </Button>
  );

  const [errorObj, setErrorObj] = useState({});
  const [loading, setLoading] = useState();
    
  const [selectedDate, setSelectedDate] = useState(null);
  
  const updateValue = (obj) => {
    TaskStore.set(
      () => ({ selectedEditObj: { ...selectedEditObj, ...obj, dueDate:selectedDate } }),
      "TaskStore-Create-Dialog-Open"
    );
  };
  const onCancel = () => {
    TaskStore.set(
      () => ({
        isOpenDialog: false,
        showDetails: false,
        selectedEditObj: {
          title: "",
          description: "",
          dueDate: "",
        },
      }),
      "TaskStore-Create-Dialog-close"
    );
    setErrorObj({});
  };

  const validateForm = () => {
    let errorList = {};
    if (!selectedEditObj.title) {
      errorList.title = "Please enter task title";
    }
    if (!selectedEditObj.dueDate) {
      errorList.dueDate = "Please enter task title";
    }
    if (Object.keys(errorList).length === 0) {
      setErrorObj({});
      return true;
    } else {
      setErrorObj(errorList);
      errorList = {};
      return false;
    }
  };
  const createEditData = () => {
    if (!validateForm()) return;
    setLoading(true);
    if (selectedEditObj._id) {
      const { _id, description, title, dueDate } = selectedEditObj;
      editTask({
        _id,
        description,
        title,
        dueDate,
      })
        .then((response) => {
          let index = listData.data.findIndex(
            (item) => item._id === selectedEditObj._id
          );
          let list = [...listData.data];
          list.splice(index, 1, response.data);
          TaskStore.set(
            () => ({ listData: { data: list, hasMore: listData.hasMore } }),
            "TaskStore-edit"
          );
          setLoading(false);
          onCancel();
          enqueueSnackbar("Successfully Edited", {
            action,
            variant: "success",
          });
        })
        .catch((error) => {
          setLoading(false);
          const {
            response: { data },
          } = error;
          enqueueSnackbar(
            data && data.message
              ? data.message
              : "Something went wrong! refresh and try again.",
            { action, variant: "error" }
          );
        });
    } else {
      createTask({
        description: selectedEditObj.description,
        title: selectedEditObj.title,
        dueDate: selectedEditObj.dueDate,
      })
        .then((response) => {
          TaskStore.set(
            () => ({
              listData: {
                data: [response.data, ...listData.data],
                hasMore: listData.hasMore,
              },
            }),
            "TaskStore-add-new"
          );
          onCancel();
          setLoading(false);
          enqueueSnackbar("Successfully Added", { action, variant: "success" });
        })
        .catch((error) => {
          const {
            response: { data },
          } = error;
          setLoading(false);
          enqueueSnackbar(
            data && data.message
              ? data.message
              : "Something went wrong! refresh and try again.",
            { action, variant: "error" }
          );
        });
    }
  };
  return (
    <>
      <Button
        onClick={() => {
          TaskStore.set(
            () => ({ isOpenDialog: true }),
            "TaskStore-Create-Dialog-Open"
          );
        }}
        className={classes.createBtn}
        size="small"
        variant="contained"
        color="secondary"
      >
        Create
      </Button>

      <Dialog
        fullWidth
        maxWidth={"sm"}
        onClose={onCancel}
        open={isOpenDialog}
        PaperProps={{ className: classes.subjectFilterDialogContent }}
      >
        <DialogContent>
          <Box mb={2}>
            <InputLabel className={classes.inputLabel}>Title*</InputLabel>
            <TextField
              fullWidth
              placeholder="Enter Title"
              error={!!errorObj.title}
              helperText={errorObj.title}
              onChange={(event) => {
                updateValue({ title: event.target.value });
              }}
              value={selectedEditObj.title}
              variant="outlined"
            />
          </Box>
          <Box mb={2}>
            <InputLabel className={classes.inputLabel}>Description</InputLabel>
            <TextareaAutosize
              rows={4}
              fullWidth
              error={!!errorObj.description}
              helperText={errorObj.description}
              placeholder="please write a Description..."
              onChange={(event) => {
                updateValue({ description: event.target.value });
              }}
              value={selectedEditObj.description}
              variant="outlined"
            />
          </Box>
          <Box mb={2}>
            <InputLabel className={classes.inputLabel}>Due Date</InputLabel>
            <DatePicker
              label="Due Date"
              value={selectedDate}
              onChange={(date) => setSelectedDate(date)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            className={classes.applyFilterBtn}
            onClick={onCancel}
            variant="outlined"
            color="primary"
          >
            Cancel
          </Button>

          <Button
            className={classes.applyFilterBtn}
            onClick={createEditData}
            loading={loading}
            variant="contained"
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

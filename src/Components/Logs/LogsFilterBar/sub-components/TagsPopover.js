import React, { useState, useCallback, useMemo } from "react";
import { Chip, InputAdornment, IconButton, TextField } from "@material-ui/core";
import FiltersIcon from "./_shared/FiltersIcon/FiltersIcon";
import LabelIcon from "@material-ui/icons/Label";
import AddIcon from "@material-ui/icons/Add";
import { useTagsStyles } from "../../styles";
import { logsSub } from "./../../sub";
import i18n from "../../../../i18n";

const TagsPopover = () => {
  const { tags } = logsSub.use();
  const selectedTags = Object.entries(tags)
    .filter(([_key, value]) => value)
    .map(([key]) => key);
  const [tagText, setTagText] = useState("");
  const classes = useTagsStyles();

  const deleteTag = useCallback(
    (tagText) => {
      const newState = { ...tags };
      delete newState[tagText];
      logsSub.set("tags", newState);
    },
    [tags],
  );

  const addTag = useCallback(() => {
    logsSub.set("tags", { ...tags, [tagText]: true });
    setTagText("");
  }, [tagText]);

  const handleKeyUp = (event) => {
    if (event.key === "Enter") addTag();
  };

  const handleOnChangeKey = (evt) => setTagText(evt.target.value);

  const endAdornment = useMemo(
    () => (
      <InputAdornment position="end">
        <IconButton
          inputProps={{ "data-testid": "input_button" }}
          onClick={addTag}
        >
          <AddIcon />
        </IconButton>
      </InputAdornment>
    ),
    [addTag],
  );

  const renderTag = (tag) => {
    return (
      <Chip
        data-testid="output_chip"
        key={tag}
        label={tag}
        onDelete={tags[tag] === true ? () => deleteTag(tag) : undefined}
        className={classes.chip}
        size="small"
      />
    );
  };

  return (
    <FiltersIcon
      icon={<LabelIcon data-testid="output_icon"></LabelIcon>}
      title="Tags"
      isActive={selectedTags.length > 0}
    >
      <div data-testid="section_tags" className={classes.tagsContainer}>
        <TextField
          className={classes.addTagText}
          value={tagText}
          onChange={handleOnChangeKey}
          onKeyUp={handleKeyUp}
          label={i18n.t("Add Tag")}
          InputProps={{ endAdornment }}
          size="small"
        />
        <div className={classes.tagsList}>{selectedTags.map(renderTag)}</div>
      </div>
    </FiltersIcon>
  );
};

export default TagsPopover;

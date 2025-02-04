import React, { useState, useCallback, useMemo } from "react";
import { Chip, InputAdornment, IconButton, TextField } from "@mui/material";
import FiltersIcon from "./_shared/FiltersIcon/FiltersIcon";
import LabelIcon from "@mui/icons-material/Label";
import AddIcon from "@mui/icons-material/Add";
import { useTagsStyles } from "../../styles";

const TagsPopover = (props) => {
  const { filters, setFilters } = props;
  const { tags } = filters;
  const selectedTags = Object.entries(tags)
    .filter(([_key, value]) => value)
    .map(([key]) => key);
  const [tagText, setTagText] = useState("");
  const classes = useTagsStyles();

  const deleteTag = useCallback(
    (tagText) => {
      const newState = { ...tags };
      delete newState[tagText];
      setFilters((oldFilters) => ({ ...oldFilters, tags: newState }));
    },
    [setFilters, tags],
  );

  const addTag = useCallback(() => {
    setFilters((oldFilters) => ({
      ...oldFilters,
      tags: {
        ...oldFilters.tags,
        [tagText]: true,
      },
    }));
    setTagText("");
  }, [tagText, setFilters]);

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
          label="Add Tag"
          InputProps={{ endAdornment }}
          size="small"
        />
        <div className={classes.tagsList}>{selectedTags.map(renderTag)}</div>
      </div>
    </FiltersIcon>
  );
};

export default TagsPopover;

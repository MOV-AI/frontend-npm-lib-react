import React, { useState, useCallback } from "react";
import { Chip, InputAdornment, IconButton, TextField } from "@material-ui/core";
import FiltersIcon from "./_shared/FiltersIcon/FiltersIcon";
import LabelIcon from "@material-ui/icons/Label";
import AddIcon from "@material-ui/icons/Add";
import { useTagsStyles } from "../../styles";

const TagsPopover = (props) => {
  // Props
  const { advancedMode, tags, handleAddTag, handleDeleteTag } = props;
  // State hook
  const [tagText, setTagText] = useState("");
  // Style hook
  const classes = useTagsStyles();

  //========================================================================================
  /*                                                                                      *
   *                                       Handlers                                       *
   *                                                                                      */
  //========================================================================================

  const addTag = useCallback(() => {
    handleAddTag(tagText);
    setTagText("");
  }, [tagText]);

  const handleKeyUp = (event) => {
    // User pressed Enter
    if (event.key === "Enter") {
      addTag();
    }
  };

  const handleOnChangeKey = (evt) => setTagText(evt.target.value);

  //========================================================================================
  /*                                                                                      *
   *                               Private Secondary Renders                              *
   *                                                                                      */
  //========================================================================================

  /**
   * @private Render input end adornment
   * @returns {Component} Input end adornment
   */
  const renderEndAdornment = () => {
    return (
      <InputAdornment position="end">
        <IconButton
          inputProps={{ "data-testid": "input_button" }}
          onClick={addTag}
        >
          <AddIcon />
        </IconButton>
      </InputAdornment>
    );
  };

  /**
   * Render each tag in Chip
   * @param {{key: string, label: string}} tag : Tag to render
   * @returns {Component} Each tag as a Chip
   */
  const renderTag = (tag) => {
    return (
      <Chip
        data-testid="output_chip"
        key={tag.key}
        label={tag.label}
        onDelete={() => handleDeleteTag(tag)}
        className={classes.chip}
        size="small"
      />
    );
  };

  //========================================================================================
  /*                                                                                      *
   *                                        Render                                        *
   *                                                                                      */
  //========================================================================================

  return (
    <FiltersIcon
      icon={<LabelIcon data-testid="output_icon"></LabelIcon>}
      title="Tags"
      disabled={!advancedMode}
      isActive={tags?.length > 0}
    >
      <div data-testid="section_tags" className={classes.tagsContainer}>
        <TextField
          className={classes.addTagText}
          value={tagText}
          onChange={handleOnChangeKey}
          onKeyUp={handleKeyUp}
          label="Add Tag"
          InputProps={{
            endAdornment: renderEndAdornment(),
          }}
          size="small"
        />
        <div className={classes.tagsList}>{tags?.map(renderTag)}</div>
      </div>
    </FiltersIcon>
  );
};

export default TagsPopover;

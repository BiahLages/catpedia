import FormControl from "./FormControl";

function CatForm(props) {
  return (
    <div className="create-form">
      <FormControl
        id="create_breed"
        label="Breed"
        type="text"
        onChange={props.onChange}
        name="breed"
        value={props.breed_value}
      />
      <FormControl
        id="create_description"
        label="Description"
        type="text"
        onChange={props.onChange}
        name="description"
        value={props.description_value}
      />
      <FormControl
        id="create_image"
        label="Image"
        type="text"
        onChange={props.onChange}
        name="image"
        value={props.image_value}
      />
      <FormControl
        id="create_video"
        label="Video"
        type="text"
        onChange={props.onChange}
        name="video"
        value={props.video_value}
      />
      <button type="button" className="button_modal" onClick={props.onClick}>
        {props.button_label}
      </button>
    </div>
  );
}
export default CatForm;

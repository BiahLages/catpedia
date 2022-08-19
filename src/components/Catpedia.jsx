import { useEffect, useState } from "react";
import "./Catpedia.css";
import { CatService } from "./services/CatService";
import FormControl from "./Forms/FormControl";
import CatForm from "./Forms/CatForm";
import Modal from "./Modal/Modal";

function Catpedia() {
  const [catsList, setCatsList] = useState([]);
  const [cat, setCat] = useState({
    cat_id: "",
  });
  const [newCat, setNewCat] = useState({
    breed: "",
    description: "",
    image: "",
    video: "",
  });
  const [attCat, setAttCat] = useState({
    breed: "",
    description: "",
    image: "",
    video: "",
    id: "",
  });
  const [showCat, setShowCat] = useState({
    breed: "",
    description: "",
    image: "",
    video: "",
  });

  const [showCatForm, setShowCatForm] = useState(false);
  const [showCatFormEdit, setShowCatFormEdit] = useState(false);
  const [showCatDetails, setShowCatDetails] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  async function findAllCats() {
    const cats = await CatService.getAll();
    setCatsList(cats);
  }

  async function findOneCat(id) {
    const cat = await CatService.getById(id);
    setCatsList([cat]);
  }

  async function create(cat) {
    const newCat = await CatService.create(cat);
    setNewCat([newCat]);
  }

  async function editCat(id, att_cat) {
    const response_att_cat = await CatService.updateById(id, att_cat);
    setAttCat({ ...response_att_cat });
  }

  async function deleteCat(id) {
    await CatService.deleteById(id);
  }

  const handleChange = (event) => {
    setCat({ ...cat, [event.target.name]: event.target.value });
  };

  const handleChangeCreate = (event) => {
    setNewCat({ ...newCat, [event.target.name]: event.target.value });
  };

  const handleChangeEdit = (event) => {
    setAttCat({
      ...attCat,
      [event.target.name]: event.target.value,
    });
  };

  const handleClick = () => {
    const cat_id_search = cat.cat_id;
    findOneCat(cat_id_search);
  };

  async function handleClickDetails(id) {
    const showCat = await CatService.getById(id);
    setShowCat({ ...showCat });
    setShowCatDetails(true);
  }

  const handleCreateCat = () => {
    const cat_to_be_created = { ...newCat };
    create(cat_to_be_created);
    setShowCatForm(false);
    setNewCat({
      breed: "",
      description: "",
      image: "",
      video: "",
    });
  };

  const handleClickEdit = async (event) => {
    setShowCatFormEdit(true);
    setAttCat({ ...attCat, id: event.target.id });
    const cat = await CatService.getById(event.target.id);
    setAttCat({ ...attCat, ...cat });
  };

  const handleClickDelete = (id) => {
    setShowDeleteModal(true);
    setCat({ cat_id: id });
  };

  const handleEditCat = () => {
    const att_cat = { ...attCat };
    const id = att_cat.id;

    delete att_cat.id;
    setShowCatFormEdit(false);
    editCat(id, att_cat);
  };

  const handleConfirmDelete = () => {
    deleteCat(cat.cat_id);
    setAttCat({ ...attCat, ...cat });
    setShowDeleteModal(false);
  };

  const closeModal = () => {
    setShowCatForm(false);
  };

  const closeModalEdit = () => {
    setShowCatFormEdit(false);
  };

  const closeModalDetails = () => {
    setShowCatDetails(false);
  };

  const closeModalDelete = () => {
    setShowDeleteModal(false);
  };

  useEffect(() => {
    findAllCats();
  }, [newCat, attCat]);

  return (
    <div className="cat_list">
      <div className="search_add">
        <button
          type="button"
          className="add_btn"
          onClick={() => setShowCatForm(true)}
        >
          Add a cat
        </button>
        {showCatForm ? (
          <Modal closeModal={closeModal}>
            <CatForm
              id="create_cat"
              onChange={handleChangeCreate}
              breed_value={newCat.breed}
              description_value={newCat.description}
              image_value={newCat.image}
              video_value={newCat.video}
              onClick={handleCreateCat}
              button_label={"Add"}
            />
          </Modal>
        ) : null}

        {showCatFormEdit ? (
          <Modal closeModal={closeModalEdit}>
            <CatForm
              onChange={handleChangeEdit}
              breed_value={attCat.breed}
              description_value={attCat.description}
              image_value={attCat.image}
              video_value={attCat.video}
              onClick={handleEditCat}
              button_label={"Edit"}
            />
          </Modal>
        ) : null}

        {showDeleteModal ? (
          <Modal closeModal={closeModalDelete}>
            Do you want to delete this?
            <div className="buttons">
              <button
                id={cat.id}
                type="button"
                className="button_modal"
                onClick={handleConfirmDelete}
              >
                Yes
              </button>
              <button className="button_modal" onClick={closeModalDelete}>
                No
              </button>
            </div>
          </Modal>
        ) : null}

        {showCatDetails ? (
          <Modal closeModal={closeModalDetails}>
            <div className="details_card">
              <h1 className="breed">{showCat.breed}</h1>
              <p className="description">{showCat.description}</p>
              <iframe
                width="504"
                height="284"
                className="video"
                src={showCat.video}
              />
            </div>
          </Modal>
        ) : null}

        <form className="search">
          <input
            type="text"
            placeholder="Search by ID"
            className="search_input"
            onChange={handleChange}
            name="cat_id"
            value={cat.cat_id}
          />
          <button type="button" className="search_btn" onClick={handleClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </button>
        </form>
      </div>
      <div className="cards_list">
        {catsList.map((cat, index) => (
          <div key={index} className="card">
            <img
              src={cat.image}
              className="img"
              alt={`Foto do gato ${cat.breed}`}
            />
            <p className="breed">{cat.breed}</p>
            <button
              id={cat.id}
              className="details_btn"
              onClick={() => handleClickDetails(cat.id)}
            >
              Details
            </button>
            <div className="edit_delete">
              <svg
                id={cat.id}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                onClick={handleClickEdit}
                className="bi bi-pencil edit"
                viewBox="0 0 16 16"
              >
                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
              </svg>
              <svg
                id={cat.id}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-trash delete"
                onClick={() => handleClickDelete(cat.id)}
                viewBox="0 0 16 16"
              >
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                <path
                  fillRule="evenodd"
                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Catpedia;

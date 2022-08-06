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

  const [showCatForm, setShowCatForm] = useState(false);

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

  const handleChange = (event) => {
    setCat({ ...cat, [event.target.name]: event.target.value });
  };

  const handleChangeCreate = (event) => {
    setNewCat({ ...newCat, [event.target.name]: event.target.value });
  };

  const handleClick = () => {
    const cat_id_search = cat.cat_id;
    findOneCat(cat_id_search);
  };

  const handleClickDetails = () => {
    
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

  const closeModal = () => {
    setShowCatForm(false);
  };

  useEffect(() => {
    findAllCats();
  }, [newCat]);

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
              class="bi bi-search"
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
          <button className="details_btn" onClick={handleClickDetails}>Details</button>
        </div>
        
      ))}
      </div>
      
    </div>
  );
}

export default Catpedia;

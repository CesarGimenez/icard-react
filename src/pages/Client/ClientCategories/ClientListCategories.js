import React, { useEffect } from "react";
import { map } from "lodash";
import { Image, Loader } from "semantic-ui-react";
import { useCategory } from "../../../hooks/useCategory";
import "./ClientListCategories.scss";
import { useNavigate, useParams } from "react-router-dom";

export const ClientListCategories = () => {
  const { getCategories, categories, loading } = useCategory();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getCategories();
  }, []);

  const goToCategory = (idCategory) => {
    navigate(`/client/${id}/${idCategory}`);
  };
  return (
    <div className="list-categories-client">
      {loading ? (
        <Loader active inline="centered"></Loader>
      ) : (
        map(categories, (category, index) => (
          <div
            className="list-categories-client__category"
            onClick={() => goToCategory(category.id)}
            key={index}
          >
            <Image src={category.image} size="small" />
            <h2>{category.title}</h2>
          </div>
        ))
      )}
    </div>
  );
};

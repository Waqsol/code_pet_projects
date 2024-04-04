package my_project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import my_project.model.Categories;

@Repository
public interface Categories_repository  extends JpaRepository<Categories, Integer> {
    
}

package my_project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
// import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import my_project.model.Categories;
import my_project.model.Dishes;


@Repository
public interface Repository_Dishes extends JpaRepository<Dishes, Integer> {

    @Query("SELECT dishes1 FROM Dishes as dishes1  WHERE dishes1.id_restaurants.id = :rest_id")
    List<Dishes> getAllDishesfromRestaurant(@Param("rest_id") Integer id);

    @Query("SELECT d FROM Dishes d WHERE d.id_category = :category ORDER BY d.id_category ASC")
    List<Dishes> findDishesByCategory(@Param("category") Categories category);

}
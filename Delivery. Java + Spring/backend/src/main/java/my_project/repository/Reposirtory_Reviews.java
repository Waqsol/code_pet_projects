package my_project.repository;

import org.springframework.stereotype.Repository;

import my_project.model.Orders;
import my_project.model.Restaurants;
import my_project.model.Reviews;
import my_project.model.Users;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface Reposirtory_Reviews extends JpaRepository<Reviews, Integer>  {
    @Query("SELECT AVG(revie.rate) FROM Reviews as revie WHERE revie.id_restaurant = :id_restaurant")
    Double  getRevieByRest(@Param("id_restaurant") Restaurants id_restaurant);

    @Query("SELECT revie FROM Reviews as revie WHERE revie.id_user = :id_user AND revie.id_order=:id_order")
    Reviews  getRevieByUserAndRest(@Param("id_user") Users id_user,@Param("id_order") Orders id_order);
}

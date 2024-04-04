package my_project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import my_project.model.Restaurants;


@Repository
public interface My_repository extends JpaRepository<Restaurants, Integer> {

}
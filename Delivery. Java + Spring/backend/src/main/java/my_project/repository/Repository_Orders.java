package my_project.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
// import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import my_project.model.Dishes;
import my_project.model.Orders;
import my_project.model.Users;


@Repository
public interface Repository_Orders extends JpaRepository<Orders, Integer> {
        
    @Query("SELECT order FROM Orders as order  WHERE order.id_user = :id_user")
    List<Orders> getOrderByUser(@Param("id_user") Users id);
}
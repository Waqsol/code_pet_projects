package my_project.repository;




import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
// import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import my_project.model.Users;


@Repository
public interface Repository_Users extends JpaRepository<Users, Integer>  {
    
    @Query("SELECT user FROM Users as user  WHERE user.login = :login AND user.password=:password")
    Users checkUserForParam(@Param("login") String login,@Param("password") String password);

}

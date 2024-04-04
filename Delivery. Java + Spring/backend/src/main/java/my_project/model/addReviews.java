package my_project.model;


import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class addReviews {
    private Integer rate;
    private Integer id_restaurant;
    private Integer id_user;
    private Integer id_order;
}

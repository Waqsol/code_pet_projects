package my_project.model;

import java.util.List;
import java.util.Map;
import java.util.Set;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString


public class addOrder {
    private String date_orders;
    private Integer price;
    private Set<Integer> id_Dishes;
    private Integer id_user;
    private List<Map<String, Integer>> dishQuantities;

}

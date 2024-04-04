package my_project.model;
import javax.persistence.Lob;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString


public class addDishes {
    private String title;
    private String description;
    private Integer price;
    private Integer id1;
    private Integer selectedCategory;
    private String image;

}

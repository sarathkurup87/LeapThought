using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace LeapThought.Models
{
    public class Label
    {
        [Required]
        [DisplayName("Save Name")]
        public string? SaveName { get; set; }
        public string? Json { get; set; }

    }
}







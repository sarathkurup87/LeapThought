using LeapThought.Models;

namespace LeapThought.Interface
{
    public interface IGet
    {
       Task<List<Label>> ReadJson();
    }
}

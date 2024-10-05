namespace RoadSide.Domain;

public class DataResult<T>
{
    public T Value { get; }
    public bool IsSuccess { get; }
    public string Error { get; }

    private DataResult(T value, bool isSuccess, string error)
    {
        Value = value;
        IsSuccess = isSuccess;
        Error = error;
    }

    public static DataResult<T> Success(T value) => new(value, true, null);
    public static DataResult<T> Failure(string error) => new(default, false, error);
}

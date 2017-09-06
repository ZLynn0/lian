package mapper;

import java.util.List;

import org.apache.ibatis.annotations.Select;

import entity.Emp;

public interface EmpMapper {
	@Select(value={"select * from emp where empno=#{empno}"})
	public Emp getEmpByEmpno(Integer empno);
	@Select(value={"insert into emp values(#{empno},#{ename},#{job},#{mgr},#{hiredate},#{sal},#{comm},#{deptno})"})
	public void insert(Emp emp);
	@Select(value={"update emp set ename=#{ename},job=#{job},mgr=#{mgr},hiredate=#{hiredate},sal=#{sal},comm=#{comm},deptno=#{deptno} where empno=#{empno}"})
	public void update(Emp emp);
	@Select(value={"delete from emp where empno=#{empno}"})
	public void delete(Integer empno); 
	@Select(value={"select * from emp "})
	public List<Emp> emplist();

}
